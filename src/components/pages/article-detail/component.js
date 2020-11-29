import React from 'react';
import { articleList } from '../article/action';
import { Link } from 'react-router-dom';

const ArticleDetail = () => {
  const categoryList = [
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
  ];

  const articleValue = 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.\n\n Boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. who has the willpower to actually sit through a self-imposed.\n\n Boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. who has the willpower to actually sit through a self-imposed';

  return (
    <div className="article-detail">
      <main className="main-article d-flex flex-column align-items-center bg-white">
        <div className="d-flex justify-content-between">
          <div>
            <img className="article-img-header" src="https://images.pexels.com/photos/758742/pexels-photo-758742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            <h2 className="mt-4 mb-4 font-playfair">Astronomy Binoculars A Great Alternative</h2>
            <div className="d-flex justify-content-between article-preference-bar">
              <div className="d-flex flex-wrap">
                {categoryList.map((kategori, index) => (
                  <div className="article-badge" key={index}>{kategori.label}</div>
                ))}
              </div>

              <div className="d-flex justify-content-end align-items-center">
                <div>
                  <h6 className="mb-1">Dicky Julian Pratama</h6>
                  <span>17 November 2020</span>
                </div>
                <img src="https://i.pinimg.com/736x/7b/5e/53/7b5e538ed41b48a45b135d8639599146.jpg" />
              </div>
            </div>
            <p className="mt-4 mb-4 text-justify">{articleValue}</p>
          </div>
          <div className="preference-bar">
            <h4 className="font-playfair">Artikel Populer</h4>
            <hr />
            {articleList.map(({ judul, gambar, tanggal_pembuatan }, index) => (
              <div className="article-highlight mb-3" key={index}>
                <img src={gambar} />
                <div>
                  <Link to="/artikel/id_artikel" className="d-block mb-0 text-black font-weight-normal">{judul}</Link>
                  <span className="text-muted">{tanggal_pembuatan}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default ArticleDetail;