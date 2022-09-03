import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import './header.css'
import './content.css'
import './article.css'

const API_URL = 'https://api.unsplash.com/search/photos?per_page=20&query='
const API_KEY = 'Client-ID vJ_uTHt8m8YJgkYrx6suLyHO5g-NBzHVd6KPgFMj1_M'

const App = () => {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            const response = await fetch(API_URL + values.search, {
              headers: {
                'Authorization': API_KEY
              }
            })
            const data = await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name="search" placeholder='Type a word'/>
          </Form>
        </Formik>
      </header>
      <div className='contaier'>
        <div className='center'>
          {photos.map(photo =>
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt='Not Found' />
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>
          )}
        </div>
      </div>
    </div>
  )
}

export default App