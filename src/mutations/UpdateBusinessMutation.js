import Relay from 'react-relay'

export default class UpdateBusinessMutation extends Relay.Mutation {

  getMutation () {
    return Relay.QL`mutation{updateBusiness}`
  }

  getFatQuery () {
    return Relay.QL`
    fragment on UpdateBusinessPayload {
      viewer
      business
    }
    `
  }

  getConfigs () {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        business: this.props.businessId,
      },
    }]
  }

  getVariables () {
    return {
      id: this.props.businessId,
      name: this.props.name,
      url: this.props.url,
    }
  }

  getOptimisticResponse () {
    return {
      model: {
        id: this.props.businessId,
        name: this.props.name,
        url: this.props.url,
      },
    }
  }
}

