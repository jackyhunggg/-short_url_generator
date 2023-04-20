function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let count = 0;
    while (count < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      count += 1;
    }
    return result;
}