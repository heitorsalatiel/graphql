const Query = {
    users(parent, args, {db}, info) {
        return !args.query ? db.users: 
        db.users.filter((value,index) => {
            return value.name.toLowerCase().includes(args.query.toLowerCase());
        });
    },
    posts(parent, args, {db}, info){
        return !args.query ? db.posts :
        db.posts.filter((value,index) => {
            return value.title.toLocaleLowerCase().includes(args.query.toLocaleLowerCase()) ||
            value.body.toLocaleLowerCase().includes(args.query.toLocaleLowerCase());
        })
    },
    comments(parent, args, {db}, info){
        return db.comments;
    }

}

export default Query;