const wait = (timeout, fn)=>{
  return new Promise.resolve(resolve =>{
      setTimeout(()=>{
        resolve(fn())
      },timeout)
  });
};


module.exports = {
  wait
}