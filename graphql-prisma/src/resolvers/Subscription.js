const Subscription = {
    comment: {
        subscribe(parent, {postId}, {prisma}, info) {

            return prisma.subscription.comment(null,info);

            // const pt =  db.posts.find((post,index) => {
            //     return (post.id === postId && post.published);
            // });
            // if(!pt) throw new Error('Post not found');

            // return pubSub.asyncIterator(`comment ${postId}`) 
        }
    },
    post:{
        subscribe(parent,args,{db,pubSub},info) {
            return pubSub.asyncIterator(`post`);
        }
    }
}

export default Subscription;