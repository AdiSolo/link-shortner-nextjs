PGDMP         %                }            link_shortener    14.16 (Homebrew)    14.16 (Homebrew)     a           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            b           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            c           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            d           1262    16384    link_shortener    DATABASE     Y   CREATE DATABASE link_shortener WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE link_shortener;
                adrian.s    false            e           0    0    DATABASE link_shortener    ACL     0   GRANT ALL ON DATABASE link_shortener TO adrian;
                   adrian.s    false    3684            �            1259    16440    Link    TABLE     �   CREATE TABLE public."Link" (
    id text NOT NULL,
    slug text NOT NULL,
    url text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    clicks integer DEFAULT 0 NOT NULL,
    "userId" text
);
    DROP TABLE public."Link";
       public         heap    adrian    false            �            1259    16432    User    TABLE     �   CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text DEFAULT 'user'::text NOT NULL
);
    DROP TABLE public."User";
       public         heap    adrian    false            �            1259    16423    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    adrian    false            ^          0    16440    Link 
   TABLE DATA           N   COPY public."Link" (id, slug, url, "createdAt", clicks, "userId") FROM stdin;
    public          adrian    false    211   �       ]          0    16432    User 
   TABLE DATA           ;   COPY public."User" (id, email, password, role) FROM stdin;
    public          adrian    false    210   �       \          0    16423    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          adrian    false    209   _       �           2606    16448    Link Link_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Link"
    ADD CONSTRAINT "Link_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Link" DROP CONSTRAINT "Link_pkey";
       public            adrian    false    211            �           2606    16439    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            adrian    false    210            �           2606    16431 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            adrian    false    209            �           1259    16450    Link_slug_key    INDEX     I   CREATE UNIQUE INDEX "Link_slug_key" ON public."Link" USING btree (slug);
 #   DROP INDEX public."Link_slug_key";
       public            adrian    false    211            �           1259    16449    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            adrian    false    210            �           2606    16451    Link Link_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Link"
    ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public."Link" DROP CONSTRAINT "Link_userId_fkey";
       public          adrian    false    3532    210    211            ^   �   x���;N�0Ekgl`��N��ױ��=!!���'5����*�&NP&G`�$!d�t�����I���u{��<�c���s[�{���]���!3�����p,m�B�O^��nؾj����Y��ʂT���#�Qc�(|�N�����x5A$��6�
#&�,&"ex�mĄx��h%��z>���;C���2xa����w]���_�      ]   �   x�3OJ63HJN�51���517JӵL4H�M5�HJ�HI54LJ�LL���sH�H�-�I�K���T1JR14P�,,)�s�I���J2��3(ut�L��t��(�1+��*��/�(	H
tu��̅����� �g'       \   �   x�m�1
�0F�9>E���K�l9��	�v,�ҩ��$s�m��;[R���QlP�n-T��1Mi�%+͆9�.c�^KV���<K�"���7F�0O7�1kG��I٤�$�,O�}�d!�����e]�u�P/Fa_C?�-q     