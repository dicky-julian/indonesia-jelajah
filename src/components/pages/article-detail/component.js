import React, { useEffect, useState } from 'react';
import { articleList } from '../article/action';
import { Link } from 'react-router-dom';
import { FullSpinner } from '../../layouts/base/spinner';
import { getArticleById } from '../../../services/api/article';
import moment from 'moment';

const ArticleDetail = (props) => {
  const { match } = props;
  const { id_user, id_artikel } = match.params;

  const [articleData, setArticleData] = useState();

  useEffect(() => {
    if (id_user && id_artikel) {
      getArticleById(id_user, id_artikel)
        .then(({ data }) => {
          if (data) {
            setArticleData(data);
          } else {
            setArticleData(null);
          }
        })
        .catch((error) => {
          setArticleData(null);
        })
    }
  }, [match])

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
    <>{articleData ?
      <div className="article-detail">
        <main className="main-article d-flex flex-column align-items-center bg-white">
          <div className="d-flex justify-content-between">
            <div>
              <img className="article-img-header" src={articleData.image} />
              <h2 className="mt-4 mb-4 font-playfair">{articleData.title || ''}</h2>
              <div className="d-flex justify-content-between article-preference-bar">
                <div className="d-flex flex-wrap">
                  {articleData.category && articleData.category.map(({ label }, index) => (
                    <div className="article-badge" key={index}>{label}</div>
                  ))}
                </div>

                <div className="d-flex justify-content-end align-items-center">
                  <div>
                    <h6 className="mb-1 text-capitalize">{articleData.user || ''}</h6>
                    <span>{moment(parseInt(id_artikel)).format('DD MMMM YYYY')}</span>
                  </div>
                  <img src="https://i.pinimg.com/736x/7b/5e/53/7b5e538ed41b48a45b135d8639599146.jpg" />
                </div>
              </div>
              <p className="text-secondary mt-3">
                <i>{articleData.subtitle}</i>
              </p>
              <p className="mt-4 mb-4 text-justify">
                {articleData.content ?
                  <div className="article-detail-container" dangerouslySetInnerHTML={{ __html: articleData.content }}></div>
                  :
                  <div></div>
                }
              </p>
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
      :
      articleData === null ?
        <div>Data tidak ditemukan</div>
        :
        <FullSpinner />
    }
    </>
  )
}

export default ArticleDetail;