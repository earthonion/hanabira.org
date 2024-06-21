//'use client';

import Link from "next/link";
import React from "react";

import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline } from "antd";

export default function About() {
  return (
    <div className="grid lg:grid-cols-body p-5">
            <br></br>
            <br></br>
      <div className="lg:col-span-10">

        <h1 className="text-blue-900 text-3xl font-bold">About Hanabira</h1>

        <div className="grid grid-cols-3 gap-8 text-center m-8">
          <div className="text-xl font-semibold text-slate-500">
            <p>花びらが</p>
            <p>風に舞うよ</p>
            <p>春の歌</p>
          </div>
          <div className="text-lg text-gray-400">
            <p>Hanabira ga</p>
            <p>Kaze ni mau yo</p>
            <p>Haru no uta</p>
          </div>
          <div className="text-base text-gray-400">
            <p>Petals dancing</p>
            <p>In the wind gracefully</p>
            <p>Song of the spring.</p>
          </div>
        </div>

        <div className="mt-2 text-gray-500">
          Hanabira is Free Open Source Japanese language learning website that
          aims to prepare students for JLPT N5-N1. Enjoy studying Japanese
          without ads and popups. Currently we are offering Grammar explanation
          for all JLPT levels. Additionally we have several JLPT vocabulary
          related sections. All lessons contain audio voiceovers for vocabulary,
          grammar and example sentences. Other features will be implemented in
          the future. Please see roadmap below.
        </div>

        <br></br>

        <div
            className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4"
            role="alert"
          >
            <p className="font-bold">Contribute to Hanabira.org</p>
            <p>
              Hanabira.org lead dev has set aside several hundred dollars
              (monthly) for meaningful contributions to the project. We welcome
              developers, designers, and content creators to join us in
              enhancing our platform. Your innovative ideas and contributions
              can make a significant impact to the project.
            </p>
          </div>

          <br></br>

        <h2 className="font-serif text-2xl antialiased text-gray-600">
          Project timeline:
        </h2>
        <br />
        <div className="mt-2 text-gray-500">
          Public Alpha version. This site is currently undergoing active
          development. We are working diligently to improve the platform and add
          new features. As a result, you may encounter occasional bugs,
          inconsistencies, or limited functionality. You can support the
          development by buying us a coffee.
        </div>
        <br />

        <div className="max-w-5xl bg-gray-50">
          <Timeline
            mode="alternate"
            items={[
              {
                children: "Create Japanese JLPT N5-N2 Grammar sections.",
              },
              {
                children: "Create Japanese JLPT N5-N2 Vocabulary sections.",
                color: "green",
              },
              {
                dot: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
                children: `Add Kanji with only one reading sections for JLPT N5-N2`,
              },
              {
                color: "red",
                children:
                  "Reading section for Japanese JLPT N3 stories (including audio)",
              },
              {
                children: "Grammar explanation of texts from reading section.",
              },
              {
                children: "Google based login for free users.",
              },
              {
                children:
                  "Spaced Repetition System (SRS) for learning Vocabulary, Grammar and Kanji.",
              },
              {
                dot: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
                children: "Adding Grammar and Vocabulary for Korean language.",
              },
            ]}
          />
        </div>

        <div className="p-4 md:p-6 bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Contact Us
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            If you have any questions or need more information, feel free to
            reach out to us. We welcome your feedback, bug reports and feature
            requests. Currently the site is in Public Alpha, so there are lots
            of bugs that we are already aware of.
          </p>
          <div className="mt-4">
            <a
              href="https://www.reddit.com/r/hanabira/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Hanabira Project Subreddit
            </a>
            <br />
            <a
              href="https://www.reddit.com/user/tcoil_443"
              className="text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Lead Developer on Reddit
            </a>
            <br />
            <a
              href="https://discord.gg/afefVyfAkH"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Hanabira Discord server
            </a>
            <br />
            <a
              href="https://github.com/tristcoil/hanabira.org"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Hanabira GitHub repo
            </a>
          </div>

        </div>

        <div className="p-4 md:p-6 bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Pricing - Free
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            Currently all content is free. And all content will be free for a long
            time. Vast majority of content will be free forever. 
            Project is open sourced, so anyone can spin up their own Hanabira server. 
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            It is possible that in the future certain features will be paid on main production hanabira.org platform to
            keep servers running and to recuperate development costs. But even in such case lots of features will
            remain freely available forever. Functionality that might become
            premium covers user specific features, such as progress tracking,
            word banks, SRS flashcards, ...
            Anyways, you can always slightly tweak the source code and you have full functionality for free.
          </p>
        </div>

        <div>
          <div className="p-6 bg-white shadow-xl rounded-lg border border-gray-200">
            <h2 className="font-semibold text-2xl mb-5 border-b pb-2 border-gray-300">
              Sources & Literature:
            </h2>

            <h3 className="font-semibold text-xl mb-5 border-b pb-2 border-gray-300">
              Japanese
            </h3>

            <ul className="pl-5 space-y-3">
              <li className="py-1 transition-colors duration-300 hover:bg-gray-50 rounded-md pl-3">
                <span className="text-blue-500 pr-2">•</span> Nihongo So Matome
                JLPT N2 series
              </li>
              <li className="py-1 transition-colors duration-300 hover:bg-gray-50 rounded-md pl-3">
                <span className="text-blue-500 pr-2">•</span> Nihongo So Matome
                JLPT N3 series
              </li>
              <li className="py-1 transition-colors duration-300 hover:bg-gray-50 rounded-md pl-3">
                <span className="text-blue-500 pr-2">•</span> Nihongo So Matome
                JLPT N4 series
              </li>
              <li className="py-1 transition-colors duration-300 hover:bg-gray-50 rounded-md pl-3">
                <span className="text-blue-500 pr-2">•</span> Nihongo So Matome
                JLPT N5 series
              </li>
              <li className="py-1 transition-colors duration-300 hover:bg-gray-50 rounded-md pl-3">
                <span className="text-blue-500 pr-2">•</span> 600 Basic Japanese
                Verbs, Tuttle Publishing
              </li>
              <li className="py-1 transition-colors duration-300 hover:bg-gray-50 rounded-md pl-3">
                <span className="text-blue-500 pr-2">•</span> New Kanzen Master
                JLPT N3 Tango Word Book (Shin Kanzen Master: JLPT N3 1800
                Important Vocabulary Words)
              </li>
            </ul>

            <h3 className="font-semibold text-xl mb-5 border-b pb-2 border-gray-300">
              Vietnamese
            </h3>
            <ul>
              <li className="py-1 transition-colors duration-300 hover:bg-gray-50 rounded-md pl-3">
                <span className="text-blue-500 pr-2">•</span> Let&apos;s speak
                Vietnamese (Binh Nhu Ngo)
              </li>
              <li className="py-1 transition-colors duration-300 hover:bg-gray-50 rounded-md pl-3">
                <span className="text-blue-500 pr-2">•</span> Vietnamese as a
                second language (Hue Van Nguyen)
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className="p-6 bg-white shadow-xl rounded-lg border border-gray-200">
            <h2 className="font-semibold text-2xl mb-5 border-b pb-2 border-gray-300">
              Web Sources:
            </h2>

            <h3 className="font-semibold text-xl mb-5 border-b pb-2 border-gray-300">
              Japanese:
            </h3>

            <p>
              <strong>JLPT level vocabulary lists</strong> taken from
              <a
                href="https://www.tanos.co.uk/jlpt/"
                className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tanos.co.uk
              </a>
            </p>

            <p className="mt-2">
              (eventually we will also use Kanji JLPT lists) licence: Creative
              Commons BY -
              <a
                href="https://www.tanos.co.uk/jlpt/sharing/"
                className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                License Details
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
