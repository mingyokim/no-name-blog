const loadBlogs = (admin) => {
  const db = admin.firestore();

  return new Promise((resolve) => {
    db.collection('blogs_partial').get().then((snapshot) => {
      // console.log(snapshot.docs);
      const partialBlogs = snapshot.docs.map((doc) => {
        console.log(doc.id, '=>', doc.data());
        return {
          id: doc.id,
        };
      });
      resolve({
        partialBlogs
      });
    }).catch((err) => {
      console.log(err);
      resolve({});
    });
  });
};

export {
  loadBlogs,
};
