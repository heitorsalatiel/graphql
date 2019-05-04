import {GetFirstName,IsValidPassword} from "./../src/utils/user";

test('Should return first name when given full name', () => {
     const firstname = GetFirstName('Heitor Salatiel');
     expect(firstname).toBe('Heitor')
});

test('Should return first name when given first name', () => {
    const firstname = GetFirstName('Arthur');
    expect(firstname).toBe('Arthur');
});

test('Should reject password with word password', () => {
    const isValid = IsValidPassword('password');
    expect(isValid).toBe(false);
});

test('Should reject a password shorter than 8 characters', () => {
    const isValid = IsValidPassword('pass123');
    expect(isValid).toBe(false);
});