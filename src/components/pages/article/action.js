import { SET_ARTICLE } from '../../../helpers/actionTypes';
import { getAllArticle } from '../../../services/api/article';

const articleList = [
  {
    judul: 'Astronomy Binoculars A Great Alternative',
    isi: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.\n\n Boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. who has the willpower to actually sit through a self-imposed.\n\n Boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. who has the willpower to actually sit through a self-imposed',
    gambar: 'https://images.pexels.com/photos/758742/pexels-photo-758742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    penulis: 'Dicky Julian Pratama',
    tanggal_pembuatan: '17 November 2020',
    kategori: [
      {
        label: 'Teknologi'
      },
      {
        label: 'Kuliner'
      },
      {
        label: 'Wisata Alam'
      },
      {
        label: 'Senja'
      },
      {
        label: 'Generasi Indie'
      }
    ]
  },
  {
    judul: 'Astronomy Binoculars A Great Alternative',
    isi: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.\n\n Boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. who has the willpower to actually sit through a self-imposed.\n\n Boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. who has the willpower to actually sit through a self-imposed',
    gambar: 'https://images.pexels.com/photos/1237087/pexels-photo-1237087.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    penulis: 'Dicky Julian Pratama',
    tanggal_pembuatan: '17 November 2020',
    kategori: [
      {
        label: 'Teknologi'
      },
      {
        label: 'Kuliner'
      },
      {
        label: 'Wisata Alam'
      },
      {
        label: 'Senja'
      },
      {
        label: 'Generasi Indie'
      }
    ]
  },
  {
    judul: 'Astronomy Binoculars A Great Alternative',
    isi: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.\n\n Boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. who has the willpower to actually sit through a self-imposed.\n\n Boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. who has the willpower to actually sit through a self-imposed',
    gambar: 'https://images.pexels.com/photos/1877078/pexels-photo-1877078.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    penulis: 'Dicky Julian Pratama',
    tanggal_pembuatan: '17 November 2020',
    kategori: [
      {
        label: 'Teknologi'
      },
      {
        label: 'Kuliner'
      },
      {
        label: 'Wisata Alam'
      },
      {
        label: 'Senja'
      },
      {
        label: 'Generasi Indie'
      }
    ]
  },
  {
    judul: 'Astronomy Binoculars A Great Alternative',
    isi: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.\n\n Boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. who has the willpower to actually sit through a self-imposed.\n\n Boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. who has the willpower to actually sit through a self-imposed',
    gambar: 'https://images.pexels.com/photos/2583847/pexels-photo-2583847.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    penulis: 'Dicky Julian Pratama',
    tanggal_pembuatan: '17 November 2020',
    kategori: [
      {
        label: 'Teknologi'
      },
      {
        label: 'Kuliner'
      },
      {
        label: 'Wisata Alam'
      },
      {
        label: 'Senja'
      },
      {
        label: 'Generasi Indie'
      }
    ]
  }
];

const setArticle = (articleData) => ({
  type: SET_ARTICLE,
  payload: articleData
})

const getArticle = () => async (dispatch) => {
  await getAllArticle()
    .then((response) => {
      const { data } = response;
      const article = [];
      if (data) {
        for (let articleKey in data) {
          for (let articleChildKey in data[articleKey]) {
            const articleData = data[articleKey][articleChildKey];
            articleData.date = articleChildKey;
            articleData.uid = articleKey;

            article.push(articleData);
          }
        }
      }
      dispatch(setArticle(article));
    })
    .catch(() => {
      dispatch(setArticle([]));
    })
}

export {
  articleList,
  setArticle,
  getArticle
}