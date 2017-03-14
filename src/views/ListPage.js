import React from 'react'
import Relay from 'react-relay'
import BusinessPreview from '../components/BusinessPreview'
import AddNew from '../components/AddNew'
import classes from './ListPage.css'

const PER_PAGE = 10

class ListPage extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
  }
  render () {
    console.log(this.props)
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          {`There are ${this.props.viewer.businessConnection.edges.length} Businesses in your directory`}
        </div>
        <div className={classes.container}>
          {this.props.viewer.businessConnection.edges.map(edge =>
            <BusinessPreview key={edge.node.id} business={edge.node} />
            )
          }
          <AddNew />
        </div>
      </div>
    )
  }
}

export default Relay.createContainer(ListPage, {
  initialVariables: {
    count: PER_PAGE,
    filter: null,
  },
  fragments: {
    viewer: () => Relay.QL`
        fragment on Viewer {
            businessConnection(first: $count, filter: $filter) {
                count
                pageInfo {
                    hasNextPage
                }
                edges {
                    cursor
                    node {
                        _id
                        ${BusinessPreview.getFragment('business')}
                        id
                    }
                }
            }
        }
      `,
  },
},
)
//
// export default Relay.createContainer(
//   ListPage,
//   {
//     fragments: {
//       viewer: () => Relay.QL`
//         fragment on Viewer {
//           businessList (first: 100000) {
//             edges {
//               node {
//                 ${BusinessPreview.getFragment('business')}
//                 id
//               }
//             }
//           }
//           id
//         }
//       `,
//     },
//   },
// )
