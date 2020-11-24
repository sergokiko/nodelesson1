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

const dirForRecursiveDelete = path.join(process.cwd(), 'recurcive-delete');

recursiveDelete(dirForRecursiveDelete)

function recursiveDelete (dirPath) {
        fs.readdir(dirPath, ((err, res) => {
            console.log(res);
            res.forEach(element => {
              const currentPath = path.join(dirPath, element)
              fs.stat(currentPath, (err, stats) => {
                  if (stats.isDirectory()) {
                      recursiveDelete(currentPath)
                  } else {
                      fs.unlink((currentPath), err1 => err1 ? console.log(err1) : null)
                     }
                 })

                })

        }))
    fs.rmdir(dirPath, err1 => err1? console.log(err1): null)
}



