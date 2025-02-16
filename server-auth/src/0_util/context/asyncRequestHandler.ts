/*******************************************************************************
 * 컨트롤러의 기존 함수는 Promise<Response>를 반환하는데,
 * 그 함수를 인자로 받아 컨트롤러가 반환하는 에러를 자동으로 캐치할 수 있는 미들웨어
 * 라우터에서 컨트롤러의 함수를 감싸서 사용
 *
 * <예시>
 * router.post("/login", asyscRequestHandler(authController.doLogin));
 *******************************************************************************/

import { Request, Response, NextFunction } from "express";

/**
 * 컨트롤러의 함수를 인자로 받아 에러 캐치하는 미들웨어 함수
 * @param fn 컨트롤러의 함수
 * @returns 에러를 캐치하는 next 함수
 */
const asyncRequestHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<Response>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default asyncRequestHandler;
