function homeController(req,res){
    console.log(req.isAuthenticated())
    // console.log(req)
    // res.status(200).json({msg:req.user})
    res.status(200).json({msg:req.user.profile})
}

export {homeController}