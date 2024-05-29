import React, { useState } from "react";
import recommendations from "../data/recommendation";
import { Button, TextField } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

const SearchList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recommendationsPerPage = 5;

  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/profile");
  }

  // Filtrer les recommandations en fonction du terme de recherche
  const filteredRecommendations = recommendations.filter(
    (rec) =>
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculer les index des recommandations pour la page actuelle
  const indexOfLastRecommendation = currentPage * recommendationsPerPage;
  const indexOfFirstRecommendation =
    indexOfLastRecommendation - recommendationsPerPage;
  const currentRecommendations = filteredRecommendations.slice(
    indexOfFirstRecommendation,
    indexOfLastRecommendation
  );

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(
    filteredRecommendations.length / recommendationsPerPage
  );

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.href = "/login"
};


  return (
    <div >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Recommendations
            </Typography>
            <Button variant="outlined"sx={{color:"white"}} onClick={handleProfile}>Mon compte</Button>
            <Button variant="outlined"sx={{color:"yellow"}} onClick={handleLogout}>Deconnexion</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <TextField
        type="text"
        label="Rechercher...."
        variant="filled"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        style={{ padding: "5px", width: "80%", maxWidth: "400px" }}
      />
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {currentRecommendations.map((rec) => (
          <li key={rec.id} style={{ marginBottom: "20px", textAlign: "left" }}>
            <h2>{rec.title}</h2>
            <p>{rec.description}</p>
          </li>
        ))}
      </ul>
      <Pagination
        totalPages={totalPages}
        paginate={paginate}
        currentPage={currentPage}
      />
      </div>
    </div>
  );
};

const Pagination = ({ totalPages, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav style={{ marginTop: "20px" }}>
      <ul
        className="pagination"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 0,
          listStyleType: "none",
        }}
      >
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
            style={{ margin: "0 5px" }}
          >
            <a
              onClick={() => paginate(number)}
              href="#"
              className="page-link"
              style={{
                padding: "10px",
                cursor: "pointer",
                textDecoration: "none",
                color: currentPage === number ? "white" : "blue",
                backgroundColor: currentPage === number ? "blue" : "white",
              }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SearchList;
