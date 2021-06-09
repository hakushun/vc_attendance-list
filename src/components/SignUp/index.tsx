import React from 'react';
import { PrimaryButton } from '../uiParts/PrimaryButton';
import { LinkButton } from '../uiParts/LinkButton';
import styles from './index.module.scss';
import { useSign } from '../../hooks/useSign';

export const SignUp: React.VFC = () => {
  const { form, isLaoding, handleChange, handleSignUp } = useSign();

  return (
    <section className={styles.root}>
      <form className={styles.form}>
        <fieldset>
          <legend>
            <h2 className={styles.title}>Sign Upフォーム</h2>
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
              disabled={isLaoding}
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
              minLength={6}
              name="new-password"
              placeholder="Password"
              disabled={isLaoding}
              className={styles.input}
              value={form.password}
              onChange={handleChange}
            />
          </div>
        </fieldset>
        <PrimaryButton
          type="submit"
          label="Sign Up"
          disabled={isLaoding}
          handleClick={handleSignUp}
        />
      </form>
      <div className={styles.wrapper}>
        未登録の方は下記より利用登録をしてください
        <LinkButton href="/login" label="Loginフォームへ" />
      </div>
    </section>
  );
};