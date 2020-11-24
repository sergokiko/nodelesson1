const fs = require('fs')
const path = require('path')

 const homeWorkDir2000 = path.join(process.cwd(), 'DZ', '2000')
const homeWorkDir1800 = path.join(process.cwd(), 'DZ', '1800')



moveFilesBetweenDir(homeWorkDir2000,homeWorkDir1800)
moveFilesBetweenDir(homeWorkDir1800,homeWorkDir2000)


function moveFilesBetweenDir ( startDir, finishDir) {
    fs.readdir((startDir), ((err, res) => {
        if (err){
            return  console.log(err);
        }
        res.forEach(file =>{
            fs.rename(path.join(startDir, file), path.join(finishDir, file), (err1 => console.log(err1)) )
        })

    }))
}
// fs.readdir((homeWorkDir2000), ((err, res) => {
//     if (err){
//        return  console.log(err);
//     }
//     res.forEach(file =>{
//         fs.rename(path.join(homeWorkDir2000, file), path.join(homeWorkDir1800, file) , (err1 => console.log(err1)) )
//     })
// }))
//
// fs.readdir((homeWorkDir1800), ((err, res) => {
//     if (err){
//         return  console.log(err);
//     }
//     res.forEach(file =>{
//         fs.rename(path.join(homeWorkDir1800, file), path.join(homeWorkDir2000, file), (err1 => console.log(err1)) )
//     })
//
// }))

