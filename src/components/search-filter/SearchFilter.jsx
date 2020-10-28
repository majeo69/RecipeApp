import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 205
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function SearchFilter({ setPublicSearchFilter, requestFilteredPublicRecipes, publicKeyword, publicFilterType }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setPublicSearchFilter(event.target.value);
    requestFilteredPublicRecipes(publicKeyword);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl} size="small">
        <InputLabel id="search-field-filter">Search filter</InputLabel>
        <Select
          labelId="search-field-filter"
          value={publicFilterType}
          onChange={handleChange}
          label="Search filter"
        >
          <MenuItem value={"byTitle"}>Search by title</MenuItem>
          <MenuItem value={"byIngredient"}>Search by ingredient</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);