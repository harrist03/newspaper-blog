import './NewArticle.css';

function NewArticle() {
    return (
        <>
            <div className="article-container">
                <h1>Article Creation</h1>

                <form className="article-form">
                    <div className="form-group">
                        <label>Title :</label>
                        <input type="text" placeholder="In Lille, students forced to accept unworthy housing conditions" />
                    </div>

                    <div className="form-group">
                        <label>Photo / video / sound :</label>
                        <input type="text" placeholder="Url / fichier / etc..." />
                    </div>

                    <div className="form-group">
                        <label>Description :</label>
                        <textarea placeholder="Cramped and unofficial shared accommodation, thermal strainer, university room infested with cockroaches, and even bed sharing..."></textarea>
                    </div>

                    <div className="form-group">
                        <label>Article text :</label>
                        <textarea placeholder="To pay her 480 euros in rent, this level 7 scholarship worker works in the summer and restricts herself..."></textarea>
                    </div>

                    <div className="form-group">
                        <label>Balise :</label>
                        <input type="text" placeholder="example #Friends , #MMI ..." />
                    </div>

                    <button className="submit-button">Create Article</button>
                </form>
            </div>

        </>
    )
}

export default NewArticle;