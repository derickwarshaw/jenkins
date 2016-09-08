// A list of all actions in the system.
import { createTypes } from 'reduxsauce'

export default createTypes(`
  LOGIN_ATTEMPT
  LOGIN_SUCCESS
  LOGIN_FAILURE
  
  GETBUILDS_ATTEMPT
  GETBUILDS_SUCCESS
  GETBUILDS_FAILURE
  
  GETJOBS_ATTEMPT
  GETJOBS_SUCCESS
  GETJOBS_FAILURE

  LOGOUT

  STARTUP
`)
