import { gql } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import Container from "../Container";

export default function Footer({ disclaimer }) {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="mb-10 h-[1px] w-full bg-slate-900"></div>
      <Container size="xl">
        <div className="py-4 px-10 mb-10 md:flex md:justify-between">
          <div class="mb-10 max-w-[300px] md:mr-20">
            <div className="mb-4">
              <Image src="/logo.jpeg" alt="me" height="80" width="200" />
            </div>
            <p>
              Provepharm is driven to improve the lives of our patients,
              employees, and the ecosystem!
            </p>
          </div>

          <ul className="mt-5 md:mt-0 flex flex-col md:flex-row text-lg text-[#1e387d]">
            <div className="md:mr-20">
              <li className="mb-3">
                <Link className="" href="/about">
                  About
                </Link>
              </li>
              <li className="mb-3">
                <Link className="" href="/products">
                  Products
                </Link>
              </li>
              <li className="mb-3">
                <Link className="ted" href="/press-releases">
                  Press Releases
                </Link>
              </li>
              <li className="mb-3">
                <Link className="" href="/posts">
                  News
                </Link>
              </li>
              <li className="mb-3">
                <Link className="" href="/events">
                  Events
                </Link>
              </li>
            </div>
            <div class="mb-6"></div>
            <div className="md:mr-20">
              <li className="mb-3">
                <Link className="" href="/contact">
                  Report an adverse event
                </Link>
              </li>
              <li>
                <Link className="" href="/compliance">
                  Compliance & Code of Conduct
                </Link>
              </li>
            </div>
            <div class="mb-6"></div>
            <div>
              <li className="mb-3">
                <Link className="" href="/terms">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link className="" href="/privacy">
                  Privacy
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </Container>
      <div className="bg-[#1e387d] text-white py-10 px-5 flex justify-center">
        <p className="text-center">{`${year} Provepharm Inc., All rights reserved`}</p>
      </div>
      <div className={disclaimer ? "h-52" : ""}></div>
    </footer>
  );
}

// Footer.fragments = {
//   entry: gql`
//     fragment NavigationMenuItemFragment on MenuItem {
//       id
//       path
//       label
//       parentId
//       cssClasses
//       menu {
//         node {
//           name
//         }
//       }
//     }
//   `,
// };
