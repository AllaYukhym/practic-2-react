import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    error: null,
    photos: [],
    per_page: 15,
    total_results: null,
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = query => {
    this.setState({
      query,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  }

  getPhotos = async (query, page) => {
    try {
      const {
        page: currentPage,
        per_page,
        photos,
        total_results,
      } = await ImageService.getImages(query, page);
      this.setState(prevState => ({
        photos: [...prevState.photos, ...photos],
        per_page: 15,
        total_results,
      }));
      console.log(photos);
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }
  };

  render() {
    const { photos, per_page, total_results, page } = this.state;
    const pageNumber = Math.ceil(total_results / per_page);
    return (
      <>
        <SearchForm onSubmit={this.handleFormSubmit} />
        <Grid>
          {photos.map(({ id, avg_color, alt, src }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {photos.length > 0 && page < pageNumber && (
          <Button onClick={this.onLoadMore}>Load more</Button>
        )}
        {photos.length === 0 && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
      </>
    );
  }
}
