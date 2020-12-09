import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PersonOutline, CalendarTodayOutlined } from '@material-ui/icons';
import { articleList } from './action';
import { getAllArticle } from '../../../services/api/article';

const Article = (props) => {
  const { article, getArticle } = props;

  useEffect(() => {
    getArticle();
  }, [])

  useEffect(() => {
    console.log(article, 'article')
  }, [article])

  return (
    <div>
      <header className="header-article d-flex justify-content-center align-items-center">
        <h1 className="font-beyond text-white">Artikel</h1>
      </header>
      <main className="main-article d-flex flex-column align-items-center bg-white">
        <div className="d-flex justify-content-between">
          <div>
            {articleList.map(({ judul, isi, gambar, penulis, tanggal_pembuatan, kategori }, index) => (
              <div className="article-container mb-5" key={index}>
                <div>
                  {/* BADGE LIST */}
                  <div className="article-badge-container justify-content-end">
                    {kategori.map((list_kategori, index) => (
                      <div className="article-badge" key={index}>{list_kategori.label}</div>
                    ))}
                  </div>

                  {/* ARTICLE CREATOR */}
                  <div className="d-flex justify-content-end align-items-center flex-nowrap mt-3">
                    <span>{penulis}</span>
                    <PersonOutline />
                  </div>

                  <div className="d-flex justify-content-end align-items-center flex-nowrap mt-3">
                    <span>{tanggal_pembuatan}</span>
                    <CalendarTodayOutlined />
                  </div>
                </div>

                <div>
                  <img src={gambar} />
                  <Link to="/artikel/id_artikel">
                    <h4 className="mt-3 mb-3">{judul}</h4>
                  </Link>
                  <p className="font-weight-light">{isi.slice(0, 150)} ...</p>
                  <Link to="/artikel/id_artikel" className="btn-dark-primary">Baca Artikel</Link>
                </div>
              </div>
            ))}
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

export default Article;