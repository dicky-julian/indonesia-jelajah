import { fireStorage } from '../firebase';
import { getUserByKey, createUser } from './user';

const references = fireStorage.ref();

const addDestinationImage = (payload, files) => {
  return new Promise(async (resolve, reject) => {
    let resultRecords = {
      url: [],
      alert: []
    }

    let fileIndexs = Object.keys(files).length;

    await getUserByKey('email', payload.email)
      .then((uid) => {
        for (let fileIndex in files) {
          const reference = references.child(`destination/${uid}/${new Date().getTime()}${fileIndex}`);
          const pathReference = reference.put(files[fileIndex]);

          if (fileIndexs > 0) {
            --fileIndexs;
            if (files[fileIndex].size < 3000000) {
              pathReference.on('state_changed', () => {
                resultRecords.alert.push({
                  label: 'success',
                  value: `${files[fileIndex].name} berhasil ditambahkan.`
                })
              }, (error) => {
                resultRecords.alert.push({
                  label: 'error',
                  value: `Kesalahan ketika menambahkan ${files[fileIndex].name}.`
                })
              }, (response) => {
                pathReference.snapshot.ref.getDownloadURL()
                  .then((downloadURL) => {
                    console.log(downloadURL)
                    resultRecords.url.push(downloadURL);
                  })
                  .then(async () => {
                    if (fileIndexs < 1) {
                      const newPayload = {
                        ...payload,
                        destinationImages: resultRecords.url
                      }

                      await createUser(newPayload, uid)
                        .then(() => {
                          resolve(resultRecords);
                        })
                        .catch(() => {
                          reject('Terjadi kesalahan ketika menyimpan data.')
                        })
                    }
                  })
              })
            } else {
              resultRecords.alert.push({
                label: 'error',
                value: `${files[fileIndex].name} melebihi batas ukuran file.`
              })
            }
          }
        }

        console.log('ug')
      });

    console.log(resultRecords, 'resultRecords')
  })
}

export {
  addDestinationImage
}