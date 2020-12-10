import React, { useEffect, useState } from 'react';
import JoditEditor from "jodit-react";
import { WallpaperOutlined } from '@material-ui/icons';
import Select from 'react-select';
import { articleCategory } from '../../../services/dummy/article';
import { readImageUrl } from '../../../helpers/readUrl';
import { decodeToken } from '../../../helpers/jwt';
import { Spinner, FullSpinner } from '../../layouts/base/spinner';
import { createArticle } from '../../../services/api/article';
import { showNotification } from '../../layouts/base/notification';

const Editor = (props) => {
  const { accessToken, article, setArticle, history } = props;

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState(null);
  const [file, setFile] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  useEffect(() => {
    return (() => {
      clearArticleStore();
    })
  }, [])

  // SET USER ACCOUNT
  useEffect(() => {
    if (accessToken) {
      const tokenData = decodeToken(accessToken);
      setUserAccount(tokenData);
    } else {
      setUserAccount();
      history.push('/');
    }
  }, [accessToken])

  const isCanSubmit = article && title && subtitle && category && file;

  const clearArticleStore = () => {
    setTitle('');
    setSubtitle('');
    setCategory(null);
    setFile(null);
  }

  const handleChangeFile = (file) => {
    if (file) {
      readImageUrl(file[0], ((result) => {
        setFile({
          file: file[0],
          local_url: result.target.result
        })
      }));
    }
  }

  const handleSubmit = async () => {
    const payload = {
      title,
      subtitle,
      category,
      image: file.file,
      content: article,
      user: userAccount.displayName
    }
    setIsSubmitLoading(true);

    await createArticle(payload, userAccount.uid)
      .then(() => {
        setArticle('');
        clearArticleStore();
        showNotification('Berhasil', 'Berhasil menambahkan artikel', 'success');
      })
      .catch((error) => {
        showNotification('Kesalahan', 'Terjadi Kesalahan ketika menambahkan artikel', 'danger');
      })

    setIsSubmitLoading(false);
  }

  return (
    <>{userAccount ?
      <main className="create-article-container d-flex flex-column align-items-center bg-white">
        <div>
          <div className="d-flex justify-content-between editor-info-article mb-3">
            <div>
              <label>Judul Artikel</label>
              <input
                type="text"
                className={`form-control ${title === 'error' && 'input-error'}`}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              {title === 'error' && <small className="text-danger">Judul Artikel tidak boleh kosong</small>}
            </div>
            <div>
              <label>Kategori Artikel</label>
              <Select
                isMulti
                defaultValue={category}
                options={articleCategory}
                onChange={(category) => setCategory(category)}
                className={`${title === 'error' && 'input-error'}`}
              />
              {category === 'error' && <small className="text-danger">Kategori tidak boleh kosong</small>}
            </div>
          </div>

          <label>SubJudul Artikel</label>
          <textarea className="form-control mb-3" value={subtitle} onChange={(e) => setSubtitle(e.target.value)}></textarea>

          <div>
            {file ?
              <div>
                <img src={file.local_url} alt="article images" className="article-image w-100" />
                <div className="d-flex justify-content-end mt-2 mb-3">
                  <button className="btn btn-sm btn-primary mr-1 d-flex">
                    Ubah Gambar
                  <input type="file" className="position-absolute" onChange={(e) => handleChangeFile(e.target.files)} />
                  </button>
                </div>
              </div>
              :
              <div className={`editor-image mb-3 ${file === 'error' && 'input-error'}`}>
                <WallpaperOutlined />
                <small className="mt-2 mb-0">Tambahkan Gambar Artikel</small>
                <input type="file" onChange={(e) => handleChangeFile(e.target.files)} />
              </div>
            }
          </div>

          <JoditEditor
            value={article || ''}
            onChange={(text) => setArticle(text)}
          />

          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-primary"
              onClick={() => handleSubmit()}
              disabled={!isCanSubmit}
            >
              {isSubmitLoading ? <Spinner /> : 'Simpan'}
            </button>
          </div>
        </div>
      </main>
      :
      <FullSpinner />
    }
    </>
  );
}

export default Editor;