import GetFirstName from "./../src/utils/user";

test('Should return first name when given full name', () => {
     const firstname = GetFirstName('Heitor Salatiel');
     if(firstname !== 'Heitor') {
         throw new Exception('Incorrect First Name returned');
     }
})