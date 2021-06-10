import React from 'react';
import { useSign } from '../../hooks/useSign';
import { Heading } from '../uiParts/Heading';
import { LinkButton } from '../uiParts/LinkButton';
import { PrimaryButton } from '../uiParts/PrimaryButton';
import { Sectioning } from '../uiParts/Sectioning';
import styles from './index.module.scss';

export const SignIn: React.VFC = () => {
  const { form, isLoading, handleChange, handleSignIn } = useSign();

  return (
    <Sectioning id="signin_form">
      <form className={styles.form}>
        <fieldset>
          <legend>
            <Heading level={2} label="Loginフォーム" />
          </legend>
          <div className={styles.inputWrapper}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              required
              aria-required
              name="email"
              placeholder="Email Address"
              disabled={isLoading}
              className={styles.input}
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              required
              aria-required
              name="current-password"
              autoComplete="current-password"
              placeholder="Password"
              disabled={isLoading}
              className={styles.input}
              value={form.password}
              onChange={handleChange}
            />
          </div>
        </fieldset>
        <PrimaryButton
          type="submit"
          label="Login"
          disabled={isLoading}
          handleClick={handleSignIn}
        />
      </form>
      <div className={styles.wrapper}>
        既に登録済みの方は下記よりログインください
        <LinkButton href="/signup" label="Sign Upフォームへ" />
      </div>
    </Sectioning>
  );
};
