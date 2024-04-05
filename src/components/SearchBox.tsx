import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { setResults } from "src/store/slices/searchSlice";
import { useDispatch } from "react-redux";
import api from "src/services/api";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
  padding: theme.spacing(0, 1),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .CheyniInputBase-input": {
    width: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeIn,
    }),
    "&:focus": {
      width: "auto",
    },
  },
}));

export default function SearchBox({ onSearchResults }: { onSearchResults?: (results: any[]) => void }) {
  const theme = useTheme();
  const darkMode = theme.palette.mode === "dark";
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>();

  const handleClickSearchIcon = () => {
    if (!isFocused) {
      searchInputRef.current?.focus();
    }
  };

  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (searchTerm !== "") {
      api.get(`/upload/title/${searchTerm}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const results = response.data;
        setSearchResults(results);
        setShowResults(!!results.length);
        dispatch(setResults(results));
      });
    } else {
      dispatch(setResults([]));
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchTerm, dispatch]);
    
  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
    onSearchResults && onSearchResults(event.target.value);
  };


  return (
    <Search
      sx={
        isFocused ? { 
          width: { xs: "50%", sm: "100%", md: "100%", lg: "100%"},
          border: darkMode ? "1px solid #fff" : "1px solid #000",
          borderRadius: "4px",
          backgroundColor: darkMode ? theme.palette.primary.dark : theme.palette.primary.light } : {
            display: { xs: "none", md: "flex" },
          }
      }
    >
      <SearchIconWrapper onClick={handleClickSearchIcon}>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        inputRef={searchInputRef}
        placeholder="Titles, people, genres"
        inputProps={{
          "aria-label": "search",
          onFocus: () => {
            setIsFocused(true);
          },
          onBlur: () => {
            setIsFocused(false);
          },
          onChange: handleInputChange,
        }}
      />
    </Search>
  );
}
