import { fireDatabase, fireStorage } from '../firebase';
import { setResponse } from '../../helpers/response';

const storeReference = fireStorage.ref();
const reference = 'article';

const getAllArticle = () => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(reference).once('value')
      .then((response) => {
        const articleData = response.val();

        if (articleData) {
          resolve(setResponse(200, articleData));
        }
      }, (error) => {
        reject(setResponse(500, error))
      })
  })
}

const getArticleByUid = (uid) => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(`${reference}/${uid}`).once('value')
      .then((response) => {
        const articleData = response.val();

        if (articleData) {
          resolve(setResponse(200, articleData));
        }
      }, (error) => {
        reject(setResponse(500, error))
      })
  })
}

const createArticle = (articleData, uid) => {
  return new Promise((resolve, reject) => {
    const { image } = articleData;

    const fileReference = storeReference.child(`article/${uid}/${new Date().getTime()}`);
    const pathReference = fileReference.put(image);

    pathReference.on('state_changed', () => {

    }, (error) => {
      reject(setResponse(500, error));
    }, () => {
      pathReference.snapshot.ref.getDownloadURL()
        .then(async (downloadUrl) => {
          articleData.image = downloadUrl;

          fireDatabase.ref(`${reference}/${uid}/${Date.now()}`)
            .set(articleData)
            .then(() => {
              resolve(setResponse(200, articleData));
            }, (error) => {
              reject(setResponse(500, error));
            })
        })
    })
  })
}

export {
  getAllArticle,
  getArticleByUid,
  createArticle
}