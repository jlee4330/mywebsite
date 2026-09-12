import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  writeBatch,
} from 'firebase/firestore';
import { BLOG_CONFIG } from '../config/blog.js';
import { firestore } from './firebase.js';

const META_DOCUMENT_ID = '_meta';

function removeUndefinedValues(record) {
  return Object.fromEntries(
    Object.entries(record).filter(([, value]) => value !== undefined),
  );
}

export function subscribeToBlogPosts(onChange, onError) {
  const postsQuery = query(
    collection(firestore, BLOG_CONFIG.postsCollection),
    orderBy('sortOrder', 'asc'),
  );

  return onSnapshot(postsQuery, snapshot => {
    const initialized = snapshot.docs.some(item => item.id === META_DOCUMENT_ID);
    const posts = snapshot.docs
      .filter(item => item.id !== META_DOCUMENT_ID)
      .map(item => {
        const { sortOrder: _sortOrder, kind: _kind, ...post } = item.data();
        return { ...post, id: item.id };
      });

    onChange({ initialized, posts });
  }, onError);
}

export async function replaceBlogPosts(nextPosts, previousPosts) {
  const batch = writeBatch(firestore);
  const collectionName = BLOG_CONFIG.postsCollection;
  const nextPostIds = new Set(nextPosts.map(post => String(post.id)));

  previousPosts.forEach(post => {
    const postId = String(post.id);
    if (!nextPostIds.has(postId)) {
      batch.delete(doc(firestore, collectionName, postId));
    }
  });

  nextPosts.forEach((post, index) => {
    const postId = String(post.id);
    batch.set(doc(firestore, collectionName, postId), removeUndefinedValues({
      ...post,
      id: undefined,
      kind: 'post',
      sortOrder: index,
    }));
  });

  batch.set(doc(firestore, collectionName, META_DOCUMENT_ID), {
    initialized: true,
    kind: 'meta',
    sortOrder: -1,
  });

  await batch.commit();
}
