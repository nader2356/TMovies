export interface IGenre {
    id: string;
    title: string;
  }
  export interface IMovie {
    id: string;
    title: string;
    poster: string;
    genres: IGenre[];
    postedBy: {
      id: string;
      username: string;
    };
    publishedAt: string;
    updateAt: string;
  }
  export interface INewMovie {
    title: string;
    poster: string;
    genres: string[];
}