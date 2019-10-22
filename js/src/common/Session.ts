/**
 * The `Session` class defines the current user session. It stores a reference
 * to the current authenticated user, and provides methods to log in/out.
 */
export default class Session {
  /**
   * The current authenticated user.
   */
  user?: User;

  /**
   * The CSRF token.
   */
  csrfToken?: string;

  constructor(user, csrfToken) {
    this.user = user;

    this.csrfToken = csrfToken;
  }

  /**
   * Attempt to log in a user.
   */
  login(data: { identification: string, password: string }, options = {}): Promise {
    return app.request(Object.assign({
      method: 'POST',
      url: app.forum.attribute('baseUrl') + '/login',
      data
    }, options));
  }

  /**
   * Log the user out.
   *
   * @public
   */
  logout() {
    window.location = app.forum.attribute('baseUrl') + '/logout?token=' + this.csrfToken;
  }
}
