const Post = {
    author(parent,args,{db}, info) {
        return db.users.find((user,index) => {
            return parent.author === user.id;
        })
    },
    comments(parent, args,{db},info){
        return db.comments.filter((comment,index) => {
            return comment.post === parent.id;
        })
    }
}

export default Post;
