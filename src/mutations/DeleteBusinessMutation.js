import Relay from 'react-relay'

export default class DeleteBusinessMutation extends Relay.Mutation {

  getMutation () {
    return Relay.QL`mutation{deleteBusiness}`
  }

  getFatQuery () {
    return Relay.QL`
    fragment on DeleteBusinessPayload {
      viewer
      deletedId
    }
    `
  }

  getConfigs () {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'business',
      deletedIDFieldName: 'deletedId',
    }]
  }

  getVariables () {
    return {
      id: this.props.businessId,
    }
  }

  getOptimisticResponse () {
    return {
      deletedId: this.props.businessId,
    }
  }
}

