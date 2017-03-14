import React from 'react'
import Relay from 'react-relay'
import { Link } from 'react-router'
import classes from './BusinessPreview.css'

class BusinessPreview extends React.Component {

  static propTypes = {
    business: React.PropTypes.object,
    router: React.PropTypes.object,
  }

  render () {
    return (
      <Link className={classes.link} to={`/view/${this.props.business.id}`}>
        <div className={classes.previewPage}>
          <img className={classes.previewImg} src={this.props.business.url} alt='Business Image' />
          <div className={classes.previewName}>
            {this.props.business.name}
          </div>
        </div>
      </Link>
    )
  }
}

export default Relay.createContainer(
  BusinessPreview,
  {
    fragments: {
      business: () => Relay.QL`
        fragment on Business {
          id
          name
          url
        }
      `,
    },
  }
)
