import asyncHandler from "express-async-handler";
import { MoviesData } from "../Data/MovieData.js";
import Movie from "../Models/MoviesModel.js"

// ********* PUBLIC CONTROLLERS **********
// import movies,   route - POST /api/movies/import
const importMovies = asyncHandler(async(req, res) => {
    await Movie.deleteMany({});
    const movies = await Movie.insertMany(MoviesData);
    res.status(201).json(movies);
});

// get all movies,   route- GET /api/movies
const getMovies = asyncHandler(async(req, res) => {
    try{
        // filter movies by category, time, language, rate, year and search
        const{ category, time, language, rate, year, search } = req.query;
        let query = {
            ...(category && { category }),
            ...(time && { time }),
            ...(language && { language }),
            ...(rate && { rate }),
            ...(year && { year }),
            ...(search && { name: { $regex: search, $options: "i" } }), 
        }

        // load more movies functionality
        const page = Number(req.query.pageNumber) || 1; // if page number not provided in query we set it to 1
        const limit = 2; // 2 movies per page
        const skip = (page - 1) * limit; // skip 2 movies per page

        // find movies by query, skip and limit
        const movies = await Movie.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        // get total number of movies
        const count = await Movie.countDocuments(query);

        // send response with movies and total number of movies
        res.json({ movies, page, pages: Math.ceil(count / limit), totalMovies: count, });
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
});

// get movie by id,   route - GET /api/movies/:id
const getMovieById = asyncHandler(async(req, res) => {
    try{
        // find movie by id in database
        const movie = await Movie.findById(req.params.id);
        // movie vetayo vane client lai pathauney
        if(movie){
            res.json(movie);
        }
        // vetayena vane error pathau
        else{
            res.status(404);
            throw new Error("Movie not found");
        }
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
});

// get top rated movies,   route - GET /api/movies/rated/top
const getTopRatedMovies = asyncHandler(async(req, res) => {
    try{
        // find top rated movies
        const movies = await Movie.find({}).sort({ rate: -1 })
        // send top rated movies to client
        res.json(movies);
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
});

// get random movies,   route - GET /api/movies/random/all
const getRandomMovies = asyncHandler(async(req, res) => {
    try{
        // find random movies
        const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
        // send random movies to client
        res.json(movies);
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
});

// ***************** PRIVATE CONTROLLERS **************** 

// create movie review,   route - POST /api/movies/:id/reviews
const createMovieReview = asyncHandler(async(req, res) => {
    const { rating, comment } = req.body;
    try{
        // find movie by id in database
        const movie = await Movie.findById(req.params.id);

        if(movie){
            // check if movie is already reviewed, if yes send error message
            const alreadyReviewed = movie.reviews.find((r) => r.userId.toString() === req.user._id.toString());
            if(alreadyReviewed){
                res.status(400);
                throw new Error("You already reviewed this movie");
            }
            // else create a new review
            const review = {
                userName: req.user.fullName,
                userId: req.user._id,
                userImage: req.user.image,
                rating: Number(rating),
                comment,
            }
            // push the new review to the reviews array
            movie.reviews.push(review);
            // increase the number of reviews
            movie.numberOfReviews = movie.reviews.length;

            // calculate the new rate
            movie.rate = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length;

            // save movie in database
            await movie.save();
            // send new movie to client
            res.status(201).json({
                message: "Review added",
            });
        }
        else{
            res.status(404);
            throw new Error("Movie not found");
        }
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
});

// ***************** ADMIN CONTROLLERS **************** 

// Update movie,   route - PUT /api/movies/:id
const updateMovie = asyncHandler(async(req, res) => {
    try{
        const{
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts
        } = req.body;

        // find movie by id in database
        const movie = await Movie.findById(req.params.id);

        if(movie){
            // update movie data
            movie.name = name || movie.name;
            movie.desc = desc || movie.desc;
            movie.image = image || movie.image;
            movie.titleImage = titleImage || movie.titleImage;
            movie.rate = rate || movie.rate;
            movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
            movie.category = category || movie.category;
            movie.time = time || movie.time;
            movie.language = language || movie.language;
            movie.year = year || movie.year;
            movie.video = video || movie.video;
            movie.casts = casts || movie.casts;

            // save movie in database

            const updatedMovie = await movie.save();
            // send updated data to client
            res.status(201).json(updatedMovie);
        }
        else{
            res.status(404);
            throw new Error("Movie not found");
        }
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
});

// Delete movie,   route - DELETE /api/movies/:id
const deleteMovie = asyncHandler(async(req, res) => {
    try{
        // find movie by id in database
        const movie = await Movie.findById(req.params.id);
        // if movie found, then delete it
        if(movie){
            await movie.deleteOne();
            res.json({ message: "Movie removed" });
        }
        // if movie not found, send 404 error
        else{
            res.status(404);
            throw new Error("Movie not found");
        }
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
});

// Delete all movies,   route - DELETE /api/movies
const deleteAllMovies = asyncHandler(async(req, res) => {
    try{
        // delete all movies
        await Movie.deleteMany({});
        res.json({ message: "All movies removed" });
    }
     catch(error){
        res.status(400).json({ message: error.message });
     }
});

// Create movie,   route - POST /api/movies
const createMovie = asyncHandler(async(req, res) => {
    try{
        const{
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts
        } = req.body;

       // create a new movie
       const movie = new Movie({
        name,
        desc,
        image,
        titleImage,
        rate,
        numberOfReviews,
        category,
        time,
        language,
        year,
        video,
        casts,
        userId: req.user._id,
       });

       // save movie in database
       if(movie){
        const createdMovie = await movie.save();
        res.status(201).json(createdMovie);
       }
       else{
        res.status(400);
        throw new Error("Invalid movie data");
       }
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
});


export { 
    importMovies, 
    getMovies,
    getMovieById, 
    getTopRatedMovies,
    getRandomMovies, 
    createMovieReview, 
    updateMovie,
    deleteMovie,
    deleteAllMovies,
    createMovie, 
};