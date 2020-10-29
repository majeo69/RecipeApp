import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setPublicSearchFilter, requestFilteredPublicRecipes } from '../../redux/puclic-recipes/public.recipes.actions';
import { selectPublicFilterType, selectFilteredPublicKeyword } from '../../redux/puclic-recipes/public.recipes.selectors';

const mapStateToProps = createStructuredSelector({
  publicFilterType: selectPublicFilterType,
  publicKeyword: selectFilteredPublicKeyword
});

const mapDispatchToProps = (dispatch) => ({
  setPublicSearchFilter: (filter) => dispatch(setPublicSearchFilter(filter)),
  requestFilteredPublicRecipes: (keyword) => dispatch(requestFilteredPublicRecipes(keyword))
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    height: "20px",
    width: "255px",
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: '0px solid',
    borderTopColor: "#2A356C",
    borderTopWidth: '3px',
    borderBottomColor: "#2A356C",
    borderBottomWidth: '3px',
    backgroundColor: "#E8E8E8",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    "&:focus": {
      borderRadius: 0,
      backgroundColor: "#E8E8E8"
    }
  }
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0)
  }
}));

const SearchbarFilter = ({ setPublicSearchFilter, requestFilteredPublicRecipes, publicKeyword, publicFilterType }) => {
  const classes = useStyles();
  const handleChange = (event) => {
    setPublicSearchFilter(event.target.value);
    requestFilteredPublicRecipes(publicKeyword);
  };

  return (
    <FormControl className={classes.margin}>
      <Select
        id="searchbar-filter"
        value={publicFilterType}
        onChange={handleChange}
        input={<BootstrapInput />}
      >
        <MenuItem value={"byTitle"}>Search by title</MenuItem>
        <MenuItem value={"byIngredient"}>Search by ingredient</MenuItem>
      </Select>
    </FormControl>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchbarFilter);