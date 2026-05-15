import mountainImg from '../assets/Mteverest.svg'

function TitlePage() {
  return (
    <div className="title-page">
      <div className="title-content">
        <h1 className="title-main">BEYOND<br />THE<br />SUMMIT</h1>
        <div className="title-line"></div>
        <p className="title-subtitle">Visualizing the<br />Routes, Risks and Realities<br /> of the Mount Everest</p>
      </div>

      <div className="title-mountain">
        <img src={mountainImg} alt="Mount Everest" />
        <p className="title-author">Priyanka Karnam</p>
      </div>
    </div>
  )
}

export default TitlePage
