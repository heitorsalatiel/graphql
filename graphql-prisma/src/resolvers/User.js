const User = {
    posts(parent,args,{db},info) {
        return db.posts.filter((post,index) => {
            return parent.id === post.author;
        });
    },
    comments(parent,args,{db},info){
        return db.comments.filter((comment,index) => {
            return parent.id === comment.author;
        })
    }
}

export default User;