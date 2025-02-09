import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
// import config from '../../config';
import { AuthServices } from './auth.service';
import config from '../../config';

//create normal user
const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUserIntoDB(req.body);
  const modifiedResult = JSON.parse(JSON.stringify(result));
  delete modifiedResult.password;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: modifiedResult,
  });
});

// Create manager account
const createManager = catchAsync(async (req, res) => {
  const result = await AuthServices.registerManagerIntoDB(req.body);
  const modifiedResult = JSON.parse(JSON.stringify(result));
  delete modifiedResult.password;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Manager is registered successfully',
    data: modifiedResult,
  });
});

// Create seller account
const createSeller = catchAsync(async (req, res) => {
  const result = await AuthServices.registerSellerIntoDB(req.body);
  const modifiedResult = JSON.parse(JSON.stringify(result));
  delete modifiedResult.password;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Seller is registered successfully',
    data: modifiedResult,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken, accessToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully',
    data: { accessToken },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  refreshToken,
  createManager,
  createSeller,
};
