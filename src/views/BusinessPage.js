import React from 'react'
import Relay from 'react-relay'
import { Link } from 'react-router'
import BusinessCard from '../components/BusinessCard'
import CreateBusinessMutation from '../mutations/CreateBusinessMutation'
import DeleteBusinessMutation from '../mutations/DeleteBusinessMutation'
import UpdateBusinessMutation from '../mutations/UpdateBusinessMutation'
import deleteIcon from '../assets/delete.svg'
import classes from './BusinessPage.css'

class BusinessPage extends React.Component {

  static propTypes = {
    viewer: React.PropTypes.object,
    params: React.PropTypes.object,
  }

  static contextTypes = {
    router: React.PropTypes.object,
  }

  constructor (props) {
    super(props)
    this.state = {
      name: this._isAddNew() ? '' : this.props.viewer.Business.name,
      url: this._isAddNew() ? '' : this.props.viewer.Business.url,
    }
  }

  _isAddNew = () => {
    return !this.props.params.hasOwnProperty('id')
  }

  _addBusiness = () => {
    Relay.Store.commitUpdate(
      new CreateBusinessMutation({name: this.state.name, url: this.state.url, viewer: this.props.viewer}),
      {
        onSuccess: () => this.context.router.push('/'),
        onFailure: (transaction) => console.log(transaction),
      },
    )
  }

  _updateBusiness = () => {
    Relay.Store.commitUpdate(
      new UpdateBusinessMutation({name: this.state.name, url: this.state.url, businessId: this.props.viewer.Business.id}),
      {
        onSuccess: () => this.context.router.push('/'),
        onFailure: (transaction) => console.log(transaction),
      },
    )
  }

  _deleteBusiness = () => {
    Relay.Store.commitUpdate(
      new DeleteBusinessMutation({businessId: this.props.params.id, viewerId: this.props.viewer.id}),
      {
        onSuccess: () => this.context.router.replace('/'),
        onFailure: (transaction) => console.log(transaction),
      },
    )
  }

  render () {
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <BusinessCard
            addNew={this._isAddNew()}
            name={this.state.name}
            url={this.state.url}
            onNameChange={(newName) => this.setState({name: newName})}
            onUrlChange={(newUrl) => this.setState({url: newUrl})}
          />
          <div className={classes.buttonContainer}>
            <div>
              {!this._isAddNew() &&
                <img src={deleteIcon} className={classes.deleteIcon} onClick={this._deleteBusiness} />
              }
            </div>
            <div className={classes.actionButtonContainer}>
              <Link className={classes.button + ' ' + classes.cancelButton + ' ' + classes.link} to={'/'}>
                Cancel
              </Link>
              <div
                className={classes.button + ' ' + classes.saveButton}
                onClick={this._isAddNew() ? this._addBusiness : this._updateBusiness}
              >
                {this._isAddNew() ? 'Add' : 'Save'}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Relay.createContainer(
  BusinessPage,
  {
    initialVariables: {
      id: null,
      businessExists: false,
    },
    prepareVariables: (prevVariables) => Object.assign({}, prevVariables, {
      businessExists: prevVariables.id !== null,
    }),
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          id
          ${CreateBusinessMutation.getFragment('viewer')}
          Business(id: $id) @include( if: $businessExists ) {
            id
            name
            url
          }
        }
      `,
    },
  },
)
