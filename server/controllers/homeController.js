function homeController(req,res){
    console.log(req.isAuthenticated())
    res.status(200).json({msg:req.user})
}

export {homeController}