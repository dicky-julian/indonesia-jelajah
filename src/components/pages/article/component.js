import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { PersonOutline, CalendarTodayOutlined } from '@material-ui/icons';
import { articleList } from './action';
import { FullSpinner } from '../../layouts/base/spinner';

const Article = (props) => {
  const { article, getArticle } = props;

  useEffect(() => {
    getArticle();
  }, [])

  return (
    <>{article ?
      <div>
        <header className="header-article d-flex justify-content-center align-items-center">
          <h1 className="font-beyond text-white">Artikel</h1>
        </header>
        <main className="main-article d-flex flex-column align-items-center bg-white">
          <div className="d-flex justify-content-between">
            <div>
              {article.map(({ title, subtitle, category, date, image, user, uid }, index) => (
                <div className="article-container mb-5" key={index}>
                  <div>
                    {/* BADGE LIST */}
                    <div className="article-badge-container justify-content-end">
                      {category.map(({ label }, index) => (
                        <div className="article-badge" key={index}>{label}</div>
                      ))}
                    </div>

                    {/* ARTICLE CREATOR */}
                    <div className="d-flex justify-content-end align-items-center flex-nowrap mt-3">
                      <span className="text-capitalize">{user}</span>
                      <PersonOutline />
                    </div>

                    <div className="d-flex justify-content-end align-items-center flex-nowrap mt-3">
                      <span>{date ? moment(parseInt(date)).format('DD MMMM YYYY') : '-'}</span>
                      <CalendarTodayOutlined />
                    </div>
                  </div>

                  <div>
                    <img src={image} />
                    <Link to="/artikel/id_artikel">
                      <h4 className="mt-3 mb-3">{title}</h4>
                    </Link>
                    <p className="font-weight-light">{subtitle ? subtitle.slice(0, 150) : ''} ...</p>
                    <Link to={`/artikel/${uid}/${date}`} className="btn-dark-primary">Baca Artikel</Link>
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
      :
      <FullSpinner />
    }
    </>
  )
}

export default Article;