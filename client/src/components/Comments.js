import moment from "moment";
// import '../style/DetailPost.css'
const Comments = ({ comment }) => {
    console.log(comment);

    return (
        <>
            <div className="card mt-3 mb-5" >
                <h2 className="m-2 p-2">All comments ...</h2>

                <div className="card" style={{ minHeight: '135px',maxHeight: '500px', overflow: 'auto' }}>
                    {
                        comment.map((comment) => {
                            return (

                                <div class="card m-2">
                                    <div class="card-header p-2 font-weight-bold">
                                        {comment.userName}
                                    </div>
                                    <div class="card-body p-2">
                                        <blockquote class="blockquote mb-0">
                                            <p className="mb-1">{comment.comment}</p>
                                            <footer class="blockquote-footer">Published At:<cite title="Source Title"> {moment(comment.updatedAt).format('l')}</cite></footer>
                                        </blockquote>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>


            </div>

        </>
    )
}

export default Comments;