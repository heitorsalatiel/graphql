const Subscription = {
    count: {
        subscribe(parent, args, {pubSub}, info) {
            let count = 0;

            setInterval(() => {
                count++;
                pubSub.publish('count',{
                    count
                });
            },3000)

            return pubSub.asyncIterator('count');
        }
    }
}

export default Subscription;