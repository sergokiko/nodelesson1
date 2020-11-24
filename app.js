const fs = require('fs')
const path = require('path')

 const homeWorkDir2000 = path.join(process.cwd(), 'DZ', '2000')
const homeWorkDir1800 = path.join(process.cwd(), 'DZ', '1800')


fs.readdir((homeWorkDir2000), ((err, res) => {
    if (err){
       return  console.log(err);
    }
    res.forEach(file =>{
        fs.rename(path.join(homeWorkDir2000, file), path.join(homeWorkDir1800, file) , (err1 => console.log(err1)) )
    })
}))

fs.readdir((homeWorkDir1800), ((err, res) => {
    if (err){
        return  console.log(err);
    }
    res.forEach(file =>{
        fs.rename(path.join(homeWorkDir1800, file), path.join(homeWorkDir2000, file), (err1 => console.log(err1)) )
    })

}))

