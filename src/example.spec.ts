
// class FriendsList
// {
//     friends = [];
//     addName(name){
//         this.friends.push(name);
//         this.announceFriendship(name);
//     }

//     announceFriendship(name){
//         global.console.log(`${name} is now a friend`)
//     }
// }

// describe ('FriendsList', () => {
//     it('initializes friends list', () => {
//         const friendsList = new FriendsList();
//         expect(friendsList.friends.length).toEqual(0);
//     });

//     it("add a friend to the list", () => {
//         const friendsList = new FriendsList();
//         friendsList.addName("Felix");
//         expect(friendsList.friends.length).toEqual(1);
//     });

//     it('announces friendship', () => {
//         const friendsList = new FriendsList();
//         friendsList.announceFriendship = jest.fn();
//         friendsList.addName("Felix");
//         expect(friendsList.announceFriendship).toHaveBeenCalled();
//     })
// });