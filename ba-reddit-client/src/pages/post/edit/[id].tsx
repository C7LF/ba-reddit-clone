import React from 'react'

import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../../utils/createUrqlClient'

const EditPost = ({}) => {
    return <div>Testing</div>
}

export default withUrqlClient(createUrqlClient)(EditPost)