import React, { useEffect, Fragment, useContext } from "react";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";
import { Link } from "react-router-dom";

const User = ({ match }) => {
  const { loading, user, getUser, getUserRepos, repos } = useContext(
    GithubContext
  );

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  // componentDidMount() {
  //   this.props.getUser(this.props.match.params.login);
  //   this.props.getUserRepos(this.props.match.params.login);
  // }

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
    company,
  } = user;
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          Back To Search
        </Link>
        Hireable:{" "}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              className="round-img"
              alt="avatar_Img"
              style={{ width: "150px" }}
            />
            <h1>{name}</h1>
            <h4>{location}</h4>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className="btn btn-dark my-2">
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong>
                    {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong>
                    {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website: </strong>
                    {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers:{followers}</div>
          <div className="badge badge-success">Following:{following}</div>
          <div className="badge badge-light">Public Repos:{public_repos}</div>
          <div className="badge badge-dark">Public Gists:{public_gists}</div>
        </div>
        <Repos repos={repos} />
      </Fragment>
      // <div>
      //   <h1>{name}</h1>
      //   <h3>{location}</h3>
      //   <h5>{bio}</h5>
      //   {/* <h5>{blog}</h5> */}
      //   <h5>{login}</h5>
      //   <h5>{followers}</h5>
      //   <h5>{following}</h5>
      //   <h5>{public_repos}</h5>
      //   <h5>{public_gists}</h5>
      // </div>
    );
  }
};

export default User;
