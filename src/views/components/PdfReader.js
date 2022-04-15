import React, { useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import './Sample.css'
function PdfReader(props) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  return (
    <div className="Example">
    {/* <header>
      <h1>react-pdf sample page</h1>
    </header> */}
    <div className="Example__container">
      {/* <div className="Example__container__load">
        <label htmlFor="file">Load from file:</label>{' '}
        <input  type="file" />
      </div> */}
      <div className="Example__container__document">
      <Document file={props.pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      </div>
      </div>
    </div>
  )
}

export default PdfReader